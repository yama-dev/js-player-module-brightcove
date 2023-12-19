include .env

VIM := nvim

PROGRAM := npm
RM := rm -rf
MK := mkdir
CP := cp
ZIP := zip

ZIP_FOLDER := _v$(VERSION)

ENV_DEV := NODE_ENV=development
ENV_PROD := NODE_ENV=production

URL_DOC := https://ja.player.support.brightcove.com/getting-started/index.html

all: bookmark serve

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

test:
	@echo $(TYPE)

zip:
	$(RM) $(ZIP_FOLDER)$(TYPE)
	$(MK) $(ZIP_FOLDER)$(TYPE)
	$(CP) dist/js-player-module-brightcove.js examples/index.html $(ZIP_FOLDER)$(TYPE)/
	sed -i "" "s/..\/dist\//.\//g" "$(ZIP_FOLDER)$(TYPE)/index.html"
	$(ZIP) $(ZIP_FOLDER)$(TYPE)/$(VERSION).zip -r $(ZIP_FOLDER)$(TYPE)/*

.PHONY: all build bookmark editor serve clean prod zip install
