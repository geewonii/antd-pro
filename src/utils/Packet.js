// 需要把属性定义到constructor中
// Field 字段类型定义
// class Field {
//   constructor(fieldName, fieldType, isNull) {
//       this.FieldName = fieldName
//       this.FieldType = fieldType
//       this.IsNull = isNull
//   }
// }

// 字段类型有：string int bool
// Dataset 结果集定义
class Dataset {
  constructor() {
    this.FieldCount = 0;
    this.Fields = [];
    this.RecordCount = 0;
    this.Records = [];
  }
}

// Packet 包定义
class Packet {
  constructor() {
    // 小版本号，用于对业务细则的判断，看业务是否需要
    this.Version = 0;
    // 返回结果 0 失败 1 成功 还可以定义其它的错误码
    this.Code = 1;
    // 错误或提示信息
    this.Message = '';
    this.Datasets = [];
    this.DatasetCount = 0;
  }

  AddDataset() {
    const dataset = new Dataset();
    this.Datasets.push(dataset);
    this.DatasetCount += 1;
  }

  GetDatasetCount() {
    return this.DatasetCount;
  }

  GetFieldCount(datasetIdx) {
    if (datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`GetFieldCount => datasetIdx: ${String(datasetIdx)} large than ${String(this.GetDatasetCount())}`);
    }
    return this.Datasets[datasetIdx].FieldCount;
  }

  // GetRecordCount 返回某个结果集的记录数(int)
  GetRecordCount(datasetIdx) {
    const datasetCount = this.GetDatasetCount();
    if (datasetIdx >= datasetCount) {
      throw new Error(`GetRecordCount => datasetIdx: ${String(datasetIdx)} large than ${String(this.GetDatasetCount())}`);
    }

    return this.Datasets[datasetIdx].RecordCount;
  }

  // return bool
  FieldExist(datasetIdx, fieldName) {
    const fieldIndex = this.GetFieldIndex(datasetIdx, fieldName);
    return fieldIndex >= 0;
  }

  // GetFieldIndex 获取某个结果集，字段的序号，如果不存在，返回-1， 不区分大小写
  // return (int)
  GetFieldIndex(datasetIdx, fieldName) {
    if (datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`GetFieldIndex => ${fieldName} does not exist`);
    }
    let fieldIndex = -1;
    for (let i = 0; i < this.Datasets[datasetIdx].FieldCount; i += 1) {
      if (this.Datasets[datasetIdx].Fields[i][0].toLowerCase() === fieldName.toLowerCase()) {
        fieldIndex = i;
        break;
      }
    }
    return fieldIndex;
  }

  // GetFieldName 返回(string)
  GetFieldName(datasetIdx, fieldIndex) {
    if (datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`GetFieldName => datasetIdx: ${String(datasetIdx)} large than ${String(this.GetDatasetCount())}`);
    }
    const n = this.GetFieldCount(datasetIdx);
    if (fieldIndex >= n) {
      throw new Error(`GetFieldName => fieldIndex: ${String(fieldIndex)} large than ${String(n)}`);
    }
    return this.Datasets[datasetIdx].Fields[fieldIndex][0];
  }

  // GetFieldType 返回(string)
  GetFieldType(datasetIdx, fieldIndex) {
    if (datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`GetFieldType => datasetIdx: ${String(datasetIdx)} large than ${String(this.GetDatasetCount())}`);
    }
    const n = this.GetFieldCount(datasetIdx);
    if (fieldIndex >= n) {
      throw new Error(`GetFieldType => fieldIndex: ${String(fieldIndex)} large than ${String(n)}`);
    }
    return this.Datasets[datasetIdx].Fields[fieldIndex][1];
  }

  // 如果字段已存在，抛出异常
  AddField(datasetIdx, fieldName, fieldType, isNull) {
    // if (datasetIdx >= this.GetDatasetCount()) {
    //   this.AddDataset();
    // }
    if (datasetIdx < 0 || datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`AddField => datasetIdx: ${String(datasetIdx)} out of range 0, ${String(this.GetDatasetCount())}`);
    }
    // 判断字段名是否已存在
    if (this.FieldExist(datasetIdx, fieldName)) {
      throw new Error(`AddField => field: ${fieldName} already exist`);
    }
    const field = [fieldName, fieldType, isNull];
    this.Datasets[datasetIdx].Fields.push(field);
    this.Datasets[datasetIdx].FieldCount += 1;
    // 对数据进行扩展
    for (let i = 0; i < this.Datasets[datasetIdx].RecordCount; i += 1) {
      this.Datasets[datasetIdx].Records[i].push('');
    }
    return this.Datasets[datasetIdx].FieldCount - 1;
  }

  // AddRecord 某个结果集增加记录，如果结果集不存在，则报错
  AddRecord(datasetIdx) {
    // let datasetCount = this.GetDatasetCount();
    // while (true) {
    //   if (datasetIdx < datasetCount) { // 条件不能放在while中，否则不刷新datasetCount的值
    //     break;
    //   }
    //   this.AddDataset();
    //   datasetCount = this.GetDatasetCount();
    // }
    if (datasetIdx < 0 || datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`AddRecord => datasetIdx: ${String(datasetIdx)} out of range 0, ${String(this.GetDatasetCount())}`);
    }
    const fieldCount = this.GetFieldCount(datasetIdx);
    const recordCount = this.GetRecordCount(datasetIdx);
    this.Datasets[datasetIdx].Records[recordCount] = new Array([fieldCount]);
    this.Datasets[datasetIdx].RecordCount += 1;
  }

  // InsertRecord 某个结果集在recordNum位置插入记录，只能跨一条记录。如现在记录数是2，recordNum取值为0-2，取3就报错
  InsertRecord(datasetIdx, recordNum) {
    if (datasetIdx < 0 || datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`InsertRecord => datasetIdx: ${String(datasetIdx)} out of range 0, ${String(this.GetDatasetCount())}`);
    }
    const recordCount = this.GetRecordCount(datasetIdx);
    if (recordNum < 0 || recordNum > recordCount) {
      throw new Error(`InsertRecord => recordNum: ${String(recordNum)} out of range 0, ${String(recordCount)}`);
    }
    const fieldCount = this.GetFieldCount(datasetIdx);
    const record = new Array([fieldCount]);
    if (recordNum >= recordCount) {
      this.Datasets[datasetIdx].Records.push(record);
    } else {
      this.Datasets[datasetIdx].Records.splice(recordNum, 0, record);
    }
    this.Datasets[datasetIdx].RecordCount += 1;
  }

  // SetItem 设置某个结果集、某行、某列的值，列可以是字段名或列序号
  SetItem(datasetIdx, row, field, value) {
    // if (datasetIdx >= this.GetDatasetCount()) {
    //   this.AddDataset();
    // }
    if (datasetIdx < 0 || datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`SetItem => datasetIdx: ${String(datasetIdx)} out of range 0, ${String(this.GetDatasetCount())}`);
    }

    let fieldIndex = -1;
    if (typeof field === 'number') {
      fieldIndex = parseInt(field, 10);
      const fieldCount = this.GetFieldCount(datasetIdx);
      if (fieldIndex < 0) {
        throw new Error('SetItem => Field index less than 0');
      }
      if (fieldIndex >= fieldCount) {
        throw new Error(`SetItem => Field index large than ${String(fieldCount)}`);
      }
    } else if (typeof field === 'string') {
      fieldIndex = this.GetFieldIndex(datasetIdx, field);
      if (fieldIndex === -1) {
        throw new Error(`SetItem => Field: ${field} not exist`);
      }
    } else {
      throw new Error('SetItem => field invalid');
    }

    const recordCount = this.GetRecordCount(datasetIdx);
    if (row >= recordCount) { // 条件不能放在while中，否则不刷新recordCount的值
      this.AddRecord(datasetIdx);
    }
    this.Datasets[datasetIdx].Records[row][fieldIndex] = value;
  }

  // AddItem 适用于结果集只有一行记录。=AddField + SetItem
  AddItem(datasetIdx, field, value) {
    let fieldIndex;
    if (typeof value === 'number') {
      if (value !== parseInt(value, 10)) {
        fieldIndex = this.AddField(datasetIdx, field, 'float', true);
      } else {
        fieldIndex = this.AddField(datasetIdx, field, 'int', true);
      }
    } else if (typeof value === 'boolean') {
      fieldIndex = this.AddField(datasetIdx, field, 'bool', true);
    } else {
      fieldIndex = this.AddField(datasetIdx, field, 'string', true);
    }
    this.SetItem(datasetIdx, 0, fieldIndex, value);
  }

  // GetItem 获取某结果集、某行、某列的值，列可以是字段名或序号 返回(Any)
  GetItem(datasetIdx, row, field) {
    const datasetCount = this.GetDatasetCount();
    if (datasetIdx >= datasetCount) {
      throw new Error(`GetItem => datasetIdx: ${String(datasetIdx)} large than ${String(datasetCount)}`);
    }
    let fieldIndex = -1;
    if (typeof field === 'number') {
      fieldIndex = parseInt(field, 10);
      const fieldCount = this.GetFieldCount(datasetIdx);
      if (fieldIndex < 0) {
        throw new Error('SetItem => Field index less than 0');
      }
      if (fieldIndex >= fieldCount) {
        throw new Error(`SetItem => Field index large than ${String(fieldCount)}`);
      }
    } else if (typeof field === 'string') {
      fieldIndex = this.GetFieldIndex(datasetIdx, field);
      if (fieldIndex === -1) {
        throw new Error(`SetItem => Field: ${field} not exist`);
      }
    } else {
      throw new Error('SetItem => field invalid');
    }

    if (row < 0) {
      throw new Error('GetItem => row less than 0');
    }
    const recordCount = this.GetRecordCount(datasetIdx);
    if (row >= recordCount) {
      throw new Error(`GetItem => row: ${String(row)} large than ${String(recordCount)}`);
    }
    return this.Datasets[datasetIdx].Records[row][fieldIndex];
  }

  // DeleteRecord 删除某个结果集的第几个记录
  DeleteRecord(datasetIdx, recordNum) {
    const datasetCount = this.GetDatasetCount();
    if (datasetIdx >= datasetCount) {
      throw new Error(`DeleteRecord => datasetIdx: ${String(datasetIdx)} large than ${String(datasetCount)}`);
    }
    const recordCount = this.GetRecordCount(datasetIdx);
    if (recordNum < 0 || recordNum >= recordCount) {
      throw new Error(`DeleteRecord => ${String(recordNum)} out of range - ${String(recordNum)}`);
    }
    this.Datasets[datasetIdx].Records.splice(recordNum, 1);
  }

  // Reset 清除内容
  Reset() {
    this.Version = 0;
    this.Code = 1;
    this.Message = '';
    this.Datasets = [];
    this.DatasetCount = 0;
  }

  // ReadFrom 从json中读取
  ReadFrom(json) {
    this.Version = json.Version;
    this.Code = json.Code;
    this.Message = json.Message;
    const datasetCount = json.DatasetCount;
    if (datasetCount > 0) {
      // reassigned datasets = json.Datasets;
      const datasets = json.Datasets;
      for (let datasetIdx = 0; datasetIdx < datasetCount; datasetIdx += 1) {
        this.AddDataset();
        const dataset = datasets[datasetIdx];
        const fieldCount = dataset.FieldCount;
        const fields = dataset.Fields;
        // 读出字段定义
        for (let fieldIndex = 0; fieldIndex < fieldCount; fieldIndex += 1) {
          const field = fields[fieldIndex];
          this.AddField(datasetIdx, field[0], field[1], field[2]);
        }
        const recordCount = dataset.RecordCount;
        const records = dataset.Records;
        // 读出记录内容
        for (let recordIndex = 0; recordIndex < recordCount; recordIndex += 1) {
          const record = records[recordIndex];
          this.AddRecord(datasetIdx);
          for (let col = 0; col < fieldCount; col += 1) {
            // const field = fields[col];
            // const fieldType = field[1];
            this.SetItem(datasetIdx, recordIndex, col, record[col]);
          }
        }
      }
    }
  }

  // 将结果集转为数组 由于GO中SELECT操作时，每次返回的字段顺序是随机的，这是由于GO语言的特性引起的。需要传入字段列表进行固定
  DatasetToList(datasetIdx, fieldList) {
    if (datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`DatasetToList => datasetIdx: ${String(datasetIdx)} large than ${String(this.GetDatasetCount())}`);
    }
    const fields = fieldList.split(',');
    const indexs = new Array(fields.length);
    for (let i = 0; i < fields.length; i += 1) {
      indexs[i] = this.GetFieldIndex(datasetIdx, fields[i].trim());
    }
    const list = new Array(this.GetRecordCount(datasetIdx));
    const fieldCount = this.GetFieldCount(datasetIdx);
    for (let row = 0; row < this.GetRecordCount(datasetIdx); row += 1) {
      const record = new Array(fieldCount);
      for (let i = 0; i < fields.length; i += 1) {
        record[i] = this.GetItem(datasetIdx, row, indexs[i]);
      }
      list[row] = record;
    }
    return list;
  }

  // 将结果集转为对象数组, 即是带字段名的
  DatasetToObjectList(datasetIdx) {
    if (datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`DatasetToObjectList => datasetIdx: ${String(datasetIdx)} large than ${String(this.GetDatasetCount())}`);
    }
    const list = [];
    const fieldCount = this.GetFieldCount(datasetIdx);
    for (let row = 0; row < this.GetRecordCount(datasetIdx); row += 1) {
      const obj = {};
      for (let i = 0; i < fieldCount; i += 1) {
        obj[this.GetFieldName(datasetIdx, i)] = this.GetItem(datasetIdx, row, i);
      }
      list.push(obj);
    }
    return list;
  }

  // 如果结果集只有一条记录，转为对象, 即是带字段名的
  DatasetToObject(datasetIdx) {
    if (datasetIdx >= this.GetDatasetCount()) {
      throw new Error(`DatasetToObject => datasetIdx: ${String(datasetIdx)} large than ${String(this.GetDatasetCount())}`);
    }
    if (this.GetRecordCount(datasetIdx) !== 1) {
      throw new Error(`DatasetToObject => datasetIdx: ${String(datasetIdx)}  RecordCount != 1`);
    }
    const fieldCount = this.GetFieldCount(datasetIdx);
    const obj = {};
    for (let i = 0; i < fieldCount; i += 1) {
      obj[this.GetFieldName(datasetIdx, i)] = this.GetItem(datasetIdx, 0, i);
    }
    return obj;
  }
}

export default Packet;
