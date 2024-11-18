// 弹窗复选
import React from "react";
import { Modal, Checkbox, Tree, Input } from "antd";
import TRNotification from "./noctification";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import styles from "./index.module.scss";

/**
 * title: 顶部名称
 * value: 选中值
 * treeData: 树形结构
 */
class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    const { treeData = [] } = props;

    this.state = {
      visible: true,
      checkAll: false,
      indeterminate: false,
      autoExpandParent: true,
      checkedKeys: [],
      checkedNodes: [],
      expandedKeys: [],
      expandedValue: treeData,
      searchValue: "",
    };
    this.deepLv = 1; // 最深叶子等级
    this.treeDataMap = this._tree2map(treeData, [], null, 1);
    this.treeData = treeData;
    this.leafNodes = this.treeDataMap.filter((x) => x.lv === this.deepLv);

    this._onSearch = this._onSearch.bind(this); // 搜索
    this._onChangeAll = this._onChangeAll.bind(this); // 全选
    this._onClearAll = this._onClearAll.bind(this); // 清空
    this._onCheckTree = this._onCheckTree.bind(this); // 树选择
    this._onExpandTree = this._onExpandTree.bind(this); // 树展开
    this._onCancel = this._onCancel.bind(this); // 取消
    this._onOk = this._onOk.bind(this); // 提交
  }

  componentDidMount() {
    this._onCheckTree(this.props.value);
  }

  isCheckAll = (checkedNodes, expandedValue) => {
    let checkAll = false;
    let indeterminate = false;
    const currentLeafArr = [];
    const currentCheck = [];

    const recursion = (treeData) => {
      for (let i = 0; i < treeData.length; i++) {
        const node = treeData[i];
        if (node.children && node.children.length > 0) {
          recursion(node.children);
        } else {
          currentLeafArr.push(node.key);
          const item = _.find(checkedNodes, (n) => n.key === node.key);
          if (item) {
            currentCheck.push(item);
          }
        }
      }
    };
    recursion(expandedValue ? expandedValue : this.state.expandedValue);

    if (currentCheck.length >= currentLeafArr.length) {
      checkAll = true;
    }

    if (
      currentCheck.length > 0 &&
      currentCheck.length < currentLeafArr.length
    ) {
      indeterminate = true;
    }
    return { checkAll, indeterminate };
  };

  getAllSubset = (arr) => {
    const allSubset = [];
    const recursion = (treeData) => {
      if (treeData && treeData.length > 0) {
        for (let i = 0; i < treeData.length; i++) {
          const node = treeData[i];
          if (node.children && node.children.length > 0) {
            recursion(node.children);
          } else {
            // 与下面保持一致
            const newNode = {
              ...node,
              key: node.key || node.value,
              title: node.title || node.label,
            };
            allSubset.push(newNode);
          }
        }
      }
    };
    recursion(arr);
    return allSubset;
  };

  searchTree = (tree, value) => {
    let result = [];
    let addedKeys = new Set(); // 用于跟踪已经添加的节点key

    function recursiveSearch(nodes) {
      nodes.forEach((node) => {
        if (node.title.indexOf(value) > -1) {
          // 检查父节点是否已在结果集中
          if (!addedKeys.has(node.key) && !addedKeys.has(node.parentKey)) {
            result.push(node);
            addedKeys.add(node.key);
          }
        }
        if (node.children) {
          recursiveSearch(node.children);
        }
      });
    }

    recursiveSearch(tree);
    return result;
  };

  _tree2map = (tree = [], list = [], parentKey = null, lv = 1) => {
    // 降维,key要唯一
    if (lv > this.deepLv) this.deepLv = lv;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      // 取值处理，可以继续添加
      const title = node.title || node.label;
      const key = node.key || node.value;
      node.key = key;
      node.title = title;
      node.parentKey = parentKey;
      node.lv = lv;
      list.push({
        key,
        title,
        parentKey,
        lv,
      });
      if (node.children?.length) {
        this._tree2map(node.children, list, node.key, lv + 1);
      }
    }

    return list;
  };

  _isChinese = (s) => {
    // 中文全匹配
    var ret = true;
    for (var i = 0; i < s.length; i++) ret = ret && s.charCodeAt(i) >= 10000;
    return ret;
  };

  _onSearch = (e) => {
    let expandedKeys = [];
    let expandedValue = [];
    const { value } = e.target;
    if (!value) {
      expandedValue = this.treeData;
    }
    if (value && this._isChinese(value)) {
      expandedKeys = this.treeDataMap
        .map((x) => (x.title.indexOf(value) > -1 ? x.parentKey : null))
        .filter((item, i, self) => item && self.indexOf(item) === i);

      expandedValue = this.searchTree(this.treeData, value);
    }
    const { checkAll, indeterminate } = this.isCheckAll(
      this.state.checkedNodes,
      expandedValue
    );
    const checkedKeys = this.state.checkedNodes.map((x) => x.key);

    this.setState({
      checkAll,
      indeterminate,
      expandedKeys,
      expandedValue,
      searchValue: value,
      autoExpandParent: true,
      checkedKeys,
    });
  };

  _onChangeAll = (e) => {
    const checkAll = e.target.checked;
    let checkedNodes = this.state.checkedNodes;
    let checkedKeys = [];
    const allSubset = this.getAllSubset([...this.state.expandedValue]);
    let indeterminate = false;
    if (checkAll) {
      checkedNodes = _.uniqBy(allSubset.concat(checkedNodes), "key");
      checkedKeys = checkedNodes.map((x) => x.value);
    } else {
      allSubset.forEach((v) => {
        _.remove(checkedNodes, (n) => n.key === v.key);
      });
      checkedKeys = checkedNodes.map((x) => x.value);
    }

    this.setState({
      checkAll,
      checkedKeys,
      checkedNodes,
      indeterminate,
    });
  };

  _onClearAll = () => {
    this.setState({
      checkAll: false,
      indeterminate: false,
      checkedKeys: [],
      checkedNodes: [],
      expandedKeys: [],
    });
  };

  _onCheckTree = (val, e) => {
    val = [...val, ...this.state.checkedKeys];
    val = _.uniq(val);
    if (e && !e.checked) {
      const currentClick = e.node;
      if (currentClick.children && currentClick.children.length > 0) {
        currentClick.children.forEach((chil) => {
          _.remove(val, (v) => v === chil.key);
        });
      }
      _.remove(val, (v) => v === currentClick.key);
    }

    const checkedNodes = this.leafNodes.filter((x) => val.includes(x.key)),
      checkedKeys = checkedNodes.map((x) => x.key);
    const { checkAll, indeterminate } = this.isCheckAll(checkedNodes);

    this.setState({
      checkedKeys,
      checkedNodes,
      checkAll,
      indeterminate,
    });
  };

  _onExpandTree = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  _onRemove = (idx) => {
    let { checkedKeys, checkedNodes, indeterminate, checkAll } = this.state;
    checkedNodes.splice(idx, 1);
    checkedKeys = checkedNodes.map((x) => x.key);
    if (!checkedKeys.length) {
      indeterminate = false;
      checkAll = false;
    }
    this.setState({
      checkAll,
      checkedKeys,
      checkedNodes,
      indeterminate,
    });
  };

  _onCancel = () => {
    this.setState({
      visible: false,
    });
    this.props.onPress({ index: 0 });
  };

  _onOk = () => {
    const { checkedKeys, checkedNodes } = this.state;
    this.setState({
      visible: false,
    });
    this.props.onPress({
      index: 1,
      checkedKeys,
      checkedNodes,
    });
  };
  orderSort(obj1, obj2) {
    var a = obj1.title;
    var b = obj2.title;
    if (b > a) {
      return -1;
    } else if (b < a) {
      return 1;
    } else {
      return 0;
    }
  }
  render() {
    const { title = "示例窗口", disabled = false } = this.props;
    const {
      visible,
      checkAll,
      indeterminate,
      autoExpandParent,
      checkedKeys = [],
      checkedNodes = [],
      expandedKeys = [],
      searchValue = "",
    } = this.state;

    const loop = (data = []) =>
      data.map((item) => {
        const { lv, parentKey, key } = item;
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const _title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className={styles.search_act}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return {
            key,
            title: _title,
            lv,
            parentKey,
            children: loop(item.children),
          };
        }

        return { key, title: _title, lv, parentKey };
      });
    return (
      <Modal
        width={580}
        className={styles.modal}
        visible={visible}
        centered={true}
        maskClosable={true}
        title={
          <div key='title' className={styles.modal_title}>
            {title}
          </div>
        }
        cancelText={"取消"}
        onCancel={this._onCancel}
        okText={"提交"}
        onOk={this._onOk}
      >
        <div className={styles.modal_body}>
          <div className={styles.treebox}>
            <div className={styles.box_header}>
              <Input
                placeholder='搜索'
                suffix={<SearchOutlined />}
                allowClear={true}
                onChange={this._onSearch}
                disabled={disabled}
              />
            </div>
            <div className={styles.box_content}>
              <Checkbox
                checked={checkAll}
                indeterminate={indeterminate}
                onChange={this._onChangeAll}
                disabled={disabled}
              >
                全选
              </Checkbox>
              <Tree
                treeData={loop(this.state.expandedValue)}
                blockNode={true}
                checkable={true}
                checkedKeys={checkedKeys}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onExpand={this._onExpandTree}
                onCheck={this._onCheckTree}
                disabled={disabled}
              />
            </div>
          </div>

          <div className={styles.choosebox}>
            <div className={styles.box_header}>
              <div>{`已选${checkedNodes.length}项`}</div>
              {!disabled && (
                <div className={styles.clear} onClick={this._onClearAll}>
                  清空
                </div>
              )}
            </div>
            <div className={styles.box_content}>
              <ul className={styles.chooseList}>
                {checkedNodes.sort(this.orderSort).map((item, idx) => {
                  return (
                    <li key={item.key}>
                      <div className={styles.chooseName}>{item.title}</div>
                      {!disabled && (
                        <CloseOutlined
                          className={styles.close}
                          onClick={this._onRemove.bind(this, idx)}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

class TRCheckboxModal {
  __key__ = "";

  show = (props) => {
    return new Promise((resolve) => {
      if (this.__key__ !== "") return;
      this.__key__ = String(Date.now());
      TRNotification.add({
        key: this.__key__,
        content: (
          <ModalComponent
            {...props}
            onPress={(result) => {
              TRNotification.remove(this.__key__);
              this.__key__ = "";
              resolve(result);
            }}
          />
        ),
        duration: null,
      });
    });
  };

  dismiss = () => {
    if (this.__key__.length > 0) {
      TRNotification.remove(this.__key__);
      this.__key__ = "";
    }
  };
}

export default new TRCheckboxModal();
