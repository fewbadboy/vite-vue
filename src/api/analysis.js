import request from "@/utils/request";

export function postAnalysisResult(data) {
  return request({
    url: "/review/upload",
    method: "post",
    data,
    timeout: 10 * 1000,
  });
}
