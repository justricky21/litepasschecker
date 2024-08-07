# litepasschecker
This is a very "light"weight password checker that takes from kkrypt0nn's  [wordlists](https://github.com/kkrypt0nn/wordlists) repository, built using Node v20.13.1.

This was built in 15 minutes after an argument of whether the `123456aA@` password was secure or not. I was confident it was at least in rockyou.txt, but nope, it hasn't been captured as a popular password yet.

Anyway, this is pretty jank as it WILL concatenate every wordlist from that repo into your RAM. I could've done so but when I wrote a script for it I ran out of assigned RAM for the file stream and was too lazy to fix it.

Afterwards, you are prompted to include your password, and it'll check on the concatenated list for it.

Remember to unzip rockyou.zip. It's very heavy and github won't let me upload it.

Spent most of the time working on this on Vercel's [pkg](https://github.com/vercel/pkg) which I found to be pretty cool, even though it's deprecated and Node 21 has similar functionality. It works, and that's good enough for me.

Anyways, have fun mashing passwords until you find one that hasn't been used everywhere. :)