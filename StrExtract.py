s = '13X357-22'
vowels = ["A","E","I","O","U","Y"]
a = [int(i) for i in s if i.isdigit()]
b = [str(i) for i in s if i.isalpha()]
b = "".join(b)
flag = 0
if b in vowels:
    for i in range(len(a)-1):
        if (a[i] + a[i + 1]) % 2 != 0:
            print("invalid")
            flag = 1
            break
    if flag == 0: print("invalid")
else:
    print("valid")