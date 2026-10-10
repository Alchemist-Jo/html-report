function retryState(index, amount) {
  if (!Number.isInteger(index) || index < 0 || index > 4) throw new Error("阶段必须为 0 至 4");
  if (![5, 10, 15, 20, 25].includes(amount)) throw new Error("演示金额必须为 5 至 25，步长为 5");
  const total = (index < 3 ? Math.min(index, 1) : 2) * amount;
  const result = index === 0 ? null : index === 3 ? amount * 2 : amount;
  const request = index === 0 ? "等待请求" : index === 3 ? "B" : "A";
  const duplicate = index === 2 || index === 4;
  const reason = [
    "先预测首次请求执行后的累计金额与返回值。",
    "没有 A 的记录，累加 " + amount + " 并保存返回结果。",
    "参数一致，读取 A 的结果，累计金额保持 " + amount + "。",
    "B 是新标识，执行新的累加，累计金额变成 " + amount * 2 + "。",
    "返回 A 保存的结果 " + amount + "；当前累计金额仍为 " + amount * 2 + "。"
  ][index];
  return {
    index, amount, total, result, request, duplicate, reason,
    withoutDeduplication: index * amount,
    label: ["尚未执行", "第 1 步 / 请求 A", "第 2 步 / 重试 A", "第 3 步 / 请求 B", "第 4 步 / 再次重试 A"][index],
    lookup: index === 0 ? "尚无记录" : duplicate ? "命中 A" : "未命中 " + request,
    lookupDetail: index === 0 ? "等待请求标识" : duplicate ? "原金额一致，读取历史结果" : "执行后保存参数与结果",
    effect: index === 0 ? "累计金额 0" : duplicate ? "累计金额保持 " + total : "累计金额增加 " + amount
  };
}
