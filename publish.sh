#!/bin/bash
lerna publish
git submodule foreach git add --all 
git submodule foreach git commit -m 'feat(bump)'
git add .
git commit -m 'bump'
git push
lerna exec -- npm publish --access public