include .env

VIM := mvim

PROGRAM := npm
RM := rm -rf
MK := mkdir
CP := cp
ZIP := zip

ZIP_FOLDER := _v$(VERSION)

ENV_DEV := NODE_ENV=development
ENV_PROD := NODE_ENV=production

URL_DOC := https://ja.apis.support.brightcove.com/

all: bookmark editor serve

build: clean prod

install:
	$(PROGRAM) install

bookmark: 
	open '$(URL_DOC)'

editor:
	$(VIM) './'

clean:
	$(RM) dist

serve:
	$(ENV_DEV) $(PROGRAM) run dev

prod:
	$(ENV_PROD) $(PROGRAM) run prod

zip:
	$(RM) $(ZIP_FOLDER)
	$(MK) $(ZIP_FOLDER)
	$(CP) dist/js-player-module-brightcove.js examples/index.html $(ZIP_FOLDER)/
	sed -i "" "s/..\/dist\//.\//g" "$(ZIP_FOLDER)/index.html"
	$(ZIP) $(ZIP_FOLDER)/$(VERSION).zip -r $(ZIP_FOLDER)/*

.PHONY: all build bookmark editor serve clean prod zip install
