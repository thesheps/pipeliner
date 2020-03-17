#!/bin/bash
lerna publish
git submodule foreach git add --all 
git submodule foreach git commit -m 'feat(bump)'
ga .
gc -m 'bump'
gp
lerna exec -- npm publish --access public