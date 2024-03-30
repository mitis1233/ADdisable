function FindProxyForURL(url, host) {
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

    for (var i = 0; i < proxies.length; i++) {
        if (isProxyAvailable(proxies[i])) {
            return proxies[i];
        }
    }
    return "DIRECT";
}

function isProxyAvailable(proxy) {
    var proxyType = proxy.split(" ")[0];
    var proxyAddress = proxy.split(" ")[1];
    if (proxyType === "PROXY") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://kemono.su", false);
        xhr.setRequestHeader('Proxy', proxy);
        try {
            xhr.send();
            if (xhr.status >= 200 && xhr.status < 300) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else if (proxyType === "SOCKS4" || proxyType === "SOCKS5") {
        return true;
    }
}