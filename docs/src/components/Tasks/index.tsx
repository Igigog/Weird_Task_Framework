type Task = {
    quest_givers: Record<string, boolean>[],
    rewards: {
        money?: string | number,
        goodwill?: string | number,
    },
    preconditions?: string[],
}

function Line({ width, bg }: { width?: string, bg?: string }) {
    return <div style={{ height: "2px", width: width ?? "100%", background: bg ?? "var(--ifm-color-primary)" }} />;
}

export function TaskView({taskPack, task, substitutions}: {taskPack: string, task: string, substitutions: Record<string, string>}) {
    const taskObj = require(`@tasks/${taskPack}/gamedata/configs/igi_tasks/tasks/${task}`);
    return (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "15px 15px 15px 15px" }}>
            <Preconditions task={taskObj} substitutions={substitutions} />
            <Line />
        <QuestGivers task={taskObj} />
            <Line />
        <Rewards task={taskObj} substitutions={substitutions} />
        </div>)
}

export function QuestGivers({task}: {task: Task}) {
  const givers = task.quest_givers.map((item) => Object.keys(item))
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Task Givers</span>
            <div style={{
                display: "flex", flexDirection: "column", width: "70%", padding: "0px 0 0 0px", placeItems: "flex-end"
            }}>{
                    givers.map((item, ix) => (
                        <>
                            <div key={ix} style={{ display: "flex", borderWidth: ix == 0 ? "0" : "1px 0 0 0", borderColor: "var(--ifm-toc-border-color)", borderStyle: "solid", justifyContent: "flex-end", width: item.length == 2 ? "50%" : "100%" }}>
                                {item.map((val, ix2) => (
                                    <div style={{ width: ix2 == 0 ? undefined : "100%", display: "flex", justifyContent: "flex-end" }} key={ix2}>{val}</div>
                                )
                                )}
                            </div>
                        </>

                    ))
                }
            </div>
        </div>
    );
}

function transform_macro(input: string, substitutions: Record<string, string>) {
    const macro_split = input.split("$");
    let data = macro_split.length === 1 ? macro_split[0] : macro_split[1];

    for (const [from, to] of Object.entries(substitutions)) {
        data = data.replaceAll(from, to);
    }

    return data.trim();
}

function to_reward(input: string | number | undefined, substitutions: Record<string, string>) {
    if (input === undefined) {
        return "0";
    }

    return transform_macro(input.toString(), substitutions);
}

export function Rewards({task, substitutions}: {task: Task, substitutions: Record<string, string>}) {
    return <div className="flexcol">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
                Money:
            </span>
            <span style={{ width: "auto" }}>
                {to_reward(task.rewards.money, substitutions)}
            </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
                Goodwill:
            </span>
            <span>
                {to_reward(task.rewards.goodwill, substitutions)}
            </span>
        </div>
    </div>
}

function Preconditions({ task, substitutions }: { task: Task, substitutions: Record<string, string> }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Preconditions:</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {task.preconditions === undefined || task.preconditions.length === 0 ? <em>none</em> : task.preconditions.map((val, ix) => (
                    <div key={ix} style={{ display: "flex", justifyContent: "flex-end" }}>{transform_macro(val, substitutions)}</div>
                ))}
            </div>
        </div>
    )
}

