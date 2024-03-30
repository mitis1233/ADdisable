var proxies = [
    "PROXY http://185.247.18.200:8888",
    "PROXY http://51.145.176.250:8080",
    "PROXY http://104.234.1.25:80",
    "PROXY http://198.20.116.86:9000",
    "SOCKS4 167.99.39.82:13486",
    "SOCKS4 193.23.253.149:7721",
    "SOCKS4 45.128.135.65:1080",
    "PROXY http://188.166.56.246:80",
    "SOCKS4 190.2.143.237:13908",
    "SOCKS5 185.45.194.124:39018",
    "PROXY http://62.112.10.26:8080",
    "SOCKS5 217.23.15.50:14917"
];

function FindProxyForURL(url, host) {
    var randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
    return validateProxy(randomProxy);
}

function validateProxy(proxy) {
    var proxyType = proxy.split(" ")[0];
    var proxyAddress = proxy.split(" ")[1];
    if (proxyType === "PROXY") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://kemono.su", false);
        xhr.setRequestHeader('Proxy', proxy);
        try {
            xhr.send();
            if (xhr.status >= 200 && xhr.status < 300) {
                return proxy;
            } else {
                return getNextProxy(proxy);
            }
        } catch (e) {
            return getNextProxy(proxy);
        }
    } else if (proxyType === "SOCKS4" || proxyType === "SOCKS5") {
        return proxy; // 假设 SOCKS 代理始终可用
    }
}

function getNextProxy(currentProxy) {
    var currentIndex = proxies.indexOf(currentProxy);
    var nextIndex = (currentIndex + 1) % proxies.length;
    return validateProxy(proxies[nextIndex]);
}