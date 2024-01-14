import re

def eliminate_text(input_text):
    # 定義你要消除的文字模式
    pattern = r'\|\|(\S+) [^\^]+\^'

    # 使用正則表達式進行匹配和替換
    result = re.sub(pattern, r'||\1^', input_text)

    return result

def process_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    processed_content = eliminate_text(content)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(processed_content)

# 輸入文件路徑
input_file_path = r'Z:\hosts.txt'

# 輸出文件路徑
output_file_path = r'Z:\hosts_AdGuard Home.txt'

# 處理文件
process_file(input_file_path, output_file_path)