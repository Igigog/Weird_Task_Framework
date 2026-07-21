type Task = {
    quest_givers: Record<string, boolean>[],
    rewards: {
        money?: string | number,
        goodwill?: string | number,
    }
}

export function TaskView({taskPack, task, substitutions}: {taskPack: string, task: string, substitutions: Record<string, string>}) {
    const taskObj = require(`@tasks/${taskPack}/gamedata/configs/igi_tasks/tasks/${task}`);
    return (<div>
        <QuestGivers task={taskObj} />
        <Rewards task={taskObj} substitutions={substitutions} />
    </div>)
}

export function QuestGivers({task}: {task: Task}) {
  const givers = task.quest_givers.map((item) => Object.keys(item))
  return (
    <div>{
        givers.map((item, ix) => (<div key={ix}>{item.join(" | ")}</div>))
        }</div>
    );
}

function to_reward(input: string | number | undefined, substitutions: Record<string, string>) {
    if (input === undefined) {
        return "0";
    }

    input = input.toString();
    const macro_split = input.split("$");
    let data = macro_split.length === 1 ? macro_split[0] : macro_split[1];
    
    for (const [from, to] of Object.entries(substitutions)) {
        data = data.replaceAll(from, to);
    }
    
    return data.trim();
}

export function Rewards({task, substitutions}: {task: Task, substitutions: Record<string, string>}) {
    return <div>
        {to_reward(task.rewards.money, substitutions)}
        {to_reward(task.rewards.goodwill, substitutions)}
    </div>
}

