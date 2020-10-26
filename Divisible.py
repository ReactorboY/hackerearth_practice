N = 6
# L = list(map(str, input().split()))
L = ['15478', '8452', '8232', '874', '985', '4512']
num = []
half = N//2
h1 = L[:half]
h2 = L[half:]
for i in h1:
    num.append(i[0])
for i in h2:
    num.append(i[-1])
num = int("".join(num))
if (num // 11) == 0:
    print("OUI")
else:
    print("NON")
