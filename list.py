a_list = ['Banana','Organge', 'Apple']

# copy list without reference
b_list = a_list[:]
#  Alternative way
# b_list = list(a_list)

# change b list item without changing a list item
b_list[0] = "Guava"

print(a_list)
print(b_list)