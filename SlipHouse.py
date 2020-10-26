if __name__ == '__main__':
    s = 'abcdE'
    a = list(s)
    for i in range(0, len(a)):
        if a[i] == a[i].upper():
            a[i] = a[i].lower()
        else:
            a[i] = a[i].upper()
    print("".join(a))
