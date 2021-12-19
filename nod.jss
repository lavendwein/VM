set 100 0

input 101
input 102

mark while
compare 101 100
jumpe result

compare 102 100
jumpe result

compare 101 102
jumpm while1
jumpl while2

mark while1
min 101 102 101
jump while

mark while2
min 102 101 102
jump while

mark result
add 101 102 101
output 101
exit