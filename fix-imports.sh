# there is a bug in snowpack with mounted folders and
# baseUlr is not respected
# we are using hithub pages wit web-piano prefix for now
# can be removed after moving to a custom domain or snowpack fix
find build/bundle -type f -name "*.js" -print0 | xargs -0 sed -i '' 's|"/bundle/|"/web-piano/bundle/|g'