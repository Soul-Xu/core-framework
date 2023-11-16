/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
export function reducer(state: any, action: Record<string, any>) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "req":
      state.req = { ...state.req, ...action.payload };
      break;
    case "modalValue":
      state.modalValue = { ...state.modalValue, ...action.payload };
      break;
    case "greater":
      state.settingsData.greater = { ...state.settingsData.greater, ...action.payload };
      break;
    case "less":
      state.settingsData.less = { ...state.settingsData.less, ...action.payload };
      break;
    case "addChecked":
      state.checkedArr = [...state.checkedArr, action.payload];
      break;
    case "delChecked":
      state.checkedArr = state.checkedArr.filter((item: any) => item.ip !== action.payload);
      break;
    case "tableSet":
      state.tableData[action.payload.index] = { ...state.tableData[action.payload.index], ...action.payload.val };
      break;
    case "tableAdd":
      state.tableData.push({ key: state.tableData.length + 1 });
      break;
    case "tableDel":
      state.tableData.splice(action.payload.index, 1);
      break;
    case "formData":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "item":
      state.list[action.payload.index].criteria = action.payload.val;
      break;
    case "del":
      state.list.splice(action.payload.index, 1);
      break;
    case "add":
      state.list.push({});
      break;
    default:
        return state;
  }
}
