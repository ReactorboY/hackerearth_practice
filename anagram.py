CHARS = 26

# reaarange characters of string
def reAnagram(str1,str2):
    i = 0
    while i < len(str1):
        count1[ord(str1[i])- ord('a')] += 1
        i += 1
    i = 0
    while i < len(str2):
        count2[ord(str2[i]) - ord('a')] += 1
        i += 1
    result = 0
    for i in range(26):
        result += abs(count1[i] - count2[i])
    return result

if __name__ == '__main__':
    count1 = [0]*CHARS
    count2 = [0]*CHARS
    print(reAnagram("cde", "abc"))

#  Optimised

