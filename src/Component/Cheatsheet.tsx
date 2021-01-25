import React from "react";
import ReactMarkdown from "react-markdown";

function Cheatsheet() {
    return (
        <ReactMarkdown>
            {`
## Numbers

- Latencies:
- Hashing:
    - MD5: 128 bits
    - SHA-1: 160 bits
    - SHA-2: SHA-226, SHA-256, SHA-512
    - bcrypt:
- Character Encoding:
    - ASCII: 7 or 8 bits = 128 or 256 characters
    - Unicode: ~16 bits ~ 2 bytes (not fixed)
- rps/qps:
    - SQL DB: 1k
    - nodejs: 10k
    - redis: 100k
- MySQL:
    - int / bigint: 4 / 8 bytes (32 / 64bit)
    - float / double: 4 / 8 bytes (32 / 64bit)
    - char(0-255): 0-255 bytes
    - varchar(M) with length L: (L + 1) bytes if L < 255, else (L + 2) bytes
    - text with length L: (L + 2) bytes
    - datetime: 8 bytes

[https://colin-scott.github.io/personal_website/research/interactive_latency.html](https://colin-scott.github.io/personal_website/research/interactive_latency.html)`}
        </ReactMarkdown>
    );
}

export default Cheatsheet;
