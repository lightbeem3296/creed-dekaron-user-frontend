import os
import subprocess
import sys
import traceback
from pathlib import Path

CUR_DIR = Path(__file__).parent.absolute()
os.chdir(CUR_DIR)


def os_shell(cmdline: str) -> str:
    try:
        print(f"\> {cmdline}")
        if sys.platform == "win32":
            result = subprocess.run(
                args=f"cmd /c {cmdline}", stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
        else:
            result = subprocess.run(
                args=f"sh -c {cmdline}", stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
        print(result.stdout.decode(errors="ignore"))
    except:
        traceback.print_exc()


def main():
    try:
        os_shell("npm run build")
        with open("build/start-http.bat", "w") as f:
            f.write('serve -s --listen 80')
        with open("build/start-https.bat", "w") as f:
            f.write('serve -s --listen 443 --ssl-cert "../ssl/cert.crt"  --ssl-key "../ssl/cert.key"')
    except:
        traceback.print_exc()


if __name__ == "__main__":
    main()
  