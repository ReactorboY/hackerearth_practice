A, B = 0, 7
for _ in range(int(input())):
    lift = int(input())
    # Need to use abs + check from lift and set it
    # position after use
    if lift - A <= abs(lift - B):
        print("A")
    else:
        print("B")