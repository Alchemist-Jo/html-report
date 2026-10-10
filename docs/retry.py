"""单进程、串行调用的教学示例，不包含持久化与并发事务。"""
from dataclasses import dataclass


@dataclass(frozen=True)
class Receipt:
    total: int


class Ledger:
    def __init__(self):
        self.total = 0
        self.results = {}

    def charge(self, request_id: str, amount: int) -> Receipt:
        if request_id in self.results:
            original_amount, receipt = self.results[request_id]
            if original_amount != amount:
                raise ValueError("request_id 已用于其他金额")
            return receipt
        self.total += amount
        receipt = Receipt(total=self.total)
        self.results[request_id] = (amount, receipt)
        return receipt


def main():
    ledger = Ledger()
    first = ledger.charge("A", 10)
    retry = ledger.charge("A", 10)
    second = ledger.charge("B", 10)
    late_retry = ledger.charge("A", 10)
    print("返回结果:", first.total, retry.total, second.total, late_retry.total)
    print("当前累计金额:", ledger.total)
    assert [first.total, retry.total, second.total, late_retry.total] == [10, 10, 20, 10]
    assert ledger.total == 20

    try:
        ledger.charge("A", 15)
    except ValueError as error:
        print("冲突请求:", error)
    else:
        raise AssertionError("相同标识、不同金额应被拒绝")
    assert ledger.total == 20
    print("已确认: 重试不重复累加，新标识独立执行，参数冲突被拒绝")


if __name__ == "__main__":
    main()
