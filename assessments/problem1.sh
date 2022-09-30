git status // make sure that the current branch is clean
git checkout HEAD-5 // switches from main branch to HEAD-5 branch
git checkout -b testbranch // Creates a new branch called testbranch based off of HEAD-5. Any work from testbranch can be merged into HEAD-5...as long as a rebase is done every now and then to prevent conflicts

