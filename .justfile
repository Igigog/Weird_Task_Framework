set shell := ["powershell.exe", "-c"]

run:
    ..\..\ModOrganizer.exe "moshortcut://:Anomaly (DX11-AVX)"

mo2:
    ..\..\ModOrganizer.exe

pack:
    #!/usr/bin/sh
    VERSION=$(grep '^TASKS_VERSION =' gamedata/scripts/igi_generic_task.script | sed 's/TASKS_VERSION = "\(.*\)".*/\1/')
    cd ..
    7z a -tzip "WTF_$VERSION.zip" Weird_Tasks_Framework/gamedata GhenTuong_Task_Pack/gamedata Arszi_Task_Pack/gamedata community-task-pack/gamedata
