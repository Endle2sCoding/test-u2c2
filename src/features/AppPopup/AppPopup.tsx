import { MouseEvent, useEffect, useState } from "react";
import { AppButton } from "../../shared/ui/AppButton/AppButton";
import { AppInput } from "../../shared/ui/AppInput/AppInput";
import { AppText } from "../../shared/ui/AppText/AppText";
import crossImg from "../../assets/cross.svg";
import s from "./AppPopup.module.scss";

enum PeriodEnum {
  YEAR = `в год`,
  MONTH = `в месяц`,
}
export const AppPopup = ({ onClose }: { onClose: () => void }) => {
  const [total, setTotal] = useState<number>(0);
  const [monthsNum, setMonthsNum] = useState<number>(12);
  const [period, setPeriod] = useState<PeriodEnum>(PeriodEnum.MONTH);
  const [inputValue, setInputValue] = useState<string>("");
  const onSetTotal = () => {
    if (inputValue) {
      const newInputValue = inputValue.split(" ").join("");

      if (period === PeriodEnum.MONTH) {
        const ttl = Number(newInputValue) / monthsNum;
        setTotal(ttl);
      } else {
        setTotal(Number(newInputValue) / (monthsNum / 12));
      }
    }
  };

  useEffect(() => {
    onSetTotal();
  }, [period, monthsNum]);
  return (
    <div
      className={s.appPopupWrapper}
      onClick={() => {
        onClose();
      }}
    >
      <div
        className={s.appPopup}
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <AppButton
          onClick={onClose}
          className={s.crossButton}
          variant="clear"
        >
          <img
            src={crossImg}
            className={s.cross}
          />
        </AppButton>
        <div className={s.content}>
          <AppText
            className={s.mainTitle}
            TagName="h3"
          >
            Платежи по кредиту
          </AppText>
          <div className={s.info}>
            <AppText>
              Введите сумму кредита и выберите срок, на который вы хотите его
              оформить. Мы автоматически рассчитаем для вас ежемесячный платеж,
              чтобы вы могли лучше спланировать свои финансы.
            </AppText>
            <AppInput
              onEnter={() => onSetTotal()}
              autoFocus
              value={inputValue}
              changeInput={(value: string) => setInputValue(value)}
              placeholder="Введите данные"
              label="Ваша сумма кредита"
            />
            <AppButton
              className={s.infoBtn}
              variant="clear"
              onClick={() => {
                onSetTotal();
              }}
            >
              Рассчитать
            </AppButton>
          </div>

          <AppText TagName="h4">Количество месяцев?</AppText>
          <div className={s.listNum}>
            {[12, 24, 36, 48].map((n) => (
              <AppButton
                key={n}
                isActive={monthsNum === n}
                onClick={() => setMonthsNum(n)}
                tag
              >
                {n}
              </AppButton>
            ))}
          </div>
        </div>

        {total !== 0 && total !== null && (
          <div className={s.result}>
            <AppText
              className={s.resultTitle}
              TagName="h4"
            >
              Итого ваш платеж по кредиту:
            </AppText>
            <div className={s.resultList}>
              {[PeriodEnum.YEAR, PeriodEnum.MONTH].map((item) => (
                <AppButton
                  isActive={item === period}
                  onClick={() => {
                    setPeriod(item);
                  }}
                  key={item}
                  tag
                >
                  {item}
                </AppButton>
              ))}
            </div>
            <AppText TagName="h2">{`${+total.toFixed(2)} рублей`} </AppText>
          </div>
        )}

        <AppButton>{"Добавить"}</AppButton>
      </div>
    </div>
  );
};
