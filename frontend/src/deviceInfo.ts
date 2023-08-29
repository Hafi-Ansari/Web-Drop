export function getDeviceInfo(): string {
  const userAgent = navigator.userAgent;
  let device: string = "Unknown Device";
  let browser: string = "Unknown Browser";

  // Detect device
  if (/Android/i.test(userAgent)) {
    device = "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    device = "iOS";
  } else if (/Windows/i.test(userAgent)) {
    device = "Windows";
  } else if (/Mac/i.test(userAgent)) {
    device = "Mac";
  } else if (/Linux/i.test(userAgent)) {
    device = "Linux";
  }

  // Detect browser
  if (/Chrome/i.test(userAgent)) {
    browser = "Chrome";
  } else if (/Safari/i.test(userAgent)) {
    browser = "Safari";
  } else if (/Firefox/i.test(userAgent)) {
    browser = "Firefox";
  } else if (/MSIE|Trident/i.test(userAgent)) {
    browser = "IE";
  } else if (/Edge/i.test(userAgent)) {
    browser = "Edge";
  }

  return `${device} ${browser}`;
}
