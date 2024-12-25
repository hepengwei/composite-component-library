import React from "react";
import { Modal } from "antd";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type RuleModalProps = {
  open: boolean;
  onCancel: () => void;
};

const contentText = `<h2 align="center">中奖规则</h2>
  <h3>一、双色球根据购买者所选单式投注号码（复式和胆拖投注按其包含的每一注单式投注计）与当期开奖号码的相符情况，确定相应的中奖资格。具体规定如下：</h3>
  <p>一等奖：投注号码与当期开奖号码全部相同（顺序不限，下同），即中奖。</p>
  <p>二等奖：投注号码与当期开奖号码中的6个红色球号码相同，即中奖。</p>
  <p>三等奖：投注号码与当期开奖号码中的任意5个红色球号码和1个蓝色球号码相同，即中奖。</p>
  <p>四等奖：投注号码与当期开奖号码中的任意5个红色球号码相同，或与任意4个红色球号码和1个蓝色球号码相同，即中奖。</p>
  <p>五等奖：投注号码与当期开奖号码中的任意4个红色球号码相同，或与任意3个红色球号码和1个蓝色球号码相同，即中奖。</p>
  <p>六等奖：投注号码与当期开奖号码中的1个蓝色球号码相同，即中奖。</p>
  <h3>二、高奖级中奖者按各奖级的中奖注数均分该奖级奖金，并以元为单位取整计算；低奖级中奖者按各奖级的单注固定奖金获得相应奖金。</h3>
  <h3>三、当期每注投注号码只有一次中奖机会，不能兼中兼得，特别设奖除外。
  <h2 align="center">中奖奖金</h2>
  <h3>双色球奖级设置分为高奖级和低奖级，一等奖和二等奖为高奖级，三至六等奖为低奖级。当期奖金减去当期低奖级奖金为当期高奖级奖金。各奖级和奖金规定如下：</h3>
  <p>一等奖：当奖池资金低于1亿元时，奖金总额为当期高奖级奖金的75%与奖池中累积的资金之和，单注奖金按注均分，单注最高限额封顶500万元。当奖池资金高于1亿元（含）时，奖金总额包括两部分，一部分为当期高奖级奖金的55%与奖池中累积的资金之和，单注奖金按注均分，单注最高限额封顶500万元；另一部分为当期高奖级奖金的20%，单注奖金按注均分，单注最高限额封顶500万元。</p>
  <p>二等奖：奖金总额为当期高奖级奖金的25%，单注奖金按注均分，单注最高限额封顶500万元。</p>
  <p>三等奖：单注奖金固定为3000元。</p>
  <p>四等奖：单注奖金固定为200元。</p>
  <p>五等奖：单注奖金固定为10元。</p>
  <p>六等奖：单注奖金固定为5元。</p>
  <h2 align="center">兑奖规则</h2>
  <h3>一、双色球兑奖当期有效。中奖者应当自开奖之日起60个自然日内，持中奖彩票到指定的地点兑奖。逾期未兑奖视为弃奖，弃奖奖金纳入彩票公益金。</h3>
  <h3>二、中奖彩票为中奖唯一凭证，中奖彩票因玷污、损坏等原因不能正确识别的，不能兑奖。</h3>
  <h3>三、兑奖机构可以查验中奖者的中奖彩票及有效身份证件，中奖者兑奖时应予配合。</h3>
  <strong>详细规则请前往<a href="https://www.cwl.gov.cn/c/2018/10/12/417937.shtml" target='_blank'>中国福利彩票官网</a>查看</strong>`;

const RuleModal = (props: RuleModalProps) => {
  const { open, onCancel } = props;

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title='游戏规则'
      width={1270}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflowX: "auto",
        }}
      >
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          children={contentText}
          components={{
            h2(params) {
              const { children, ...rest } = params;
              return (
                <h2
                  style={{
                    fontSize: "20px",
                    lineHeight: "50px",
                    marginTop: "4px",
                  }}
                  {...rest}
                >
                  {children}
                </h2>
              );
            },
            h3(params) {
              const { children, ...rest } = params;
              return (
                <h3 style={{ fontSize: "16px",lineHeight: "40px" }} {...rest}>
                  {children}
                </h3>
              );
            },
            p(params) {
              const { children, ...rest } = params;
              return (
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: "36px",
                    textIndent: "2em",
                  }}
                  {...rest}
                >
                  {children}
                </p>
              );
            },
            strong(params) {
              const { children, ...rest } = params;
              return (
                <strong
                  style={{
                    fontWeight: "500",
                    fontSize: "15px",
                    lineHeight: "20px",
                    marginTop: "20px",
                    color: "#555555",
                  }}
                  {...rest}
                >
                  {children}
                </strong>
              );
            },
          }}
        />
      </div>
    </Modal>
  );
};

export default RuleModal;
