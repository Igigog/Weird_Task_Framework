pack:
    #!/usr/bin/sh
    VERSION=$(grep '^TASKS_VERSION =' gamedata/scripts/igi_generic_task.script | sed 's/TASKS_VERSION = "\(.*\)".*/\1/')
    FILENAME="WTF_$VERSION.zip"

    (cd .. && zip -r "Weird_Tasks_Framework/$FILENAME" Weird_Tasks_Framework/gamedata)
    (cd task_packs && for gamedata in */gamedata; do zip -r "../$FILENAME" "$gamedata"; done)

linkup:
    -for pack in task_packs/*; do [[ -L "../$(basename $pack)" ]] && rm -f "../$(basename $pack)"; done
    for pack in task_packs/*; do ln -s $(realpath "$pack") "../$(basename $pack)"; done