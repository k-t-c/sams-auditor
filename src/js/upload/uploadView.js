function uploadNoticeMsg(msgHTML = "") {
  const noticeDiv = document.getElementById("uploadViewNotice");
  if (noticeDiv) {
    noticeDiv.innerHTML = msgHTML;
  }
}