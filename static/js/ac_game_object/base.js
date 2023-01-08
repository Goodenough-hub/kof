let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.timedelta = 0; // 用来存储当前这个帧到上个帧的时间间隔
        this.has_call_start = false;
    }

    start() { // 初始执行一次
    }

    update() { // 每一帧执行一次（除了第一帧以外）

    }

    destory() { // 删除当前对象
        for (let i in AC_GAME_OBJECTS) { // in枚举数组下标
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp; // 记录上一帧在什么时间执行

let AC_GAME_OBJECTS_FRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECTS) { // of枚举数组的值
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp; // 当前执行时刻减去上一帧执行时刻
            obj.update();
        }
    }
    last_timestamp = timestamp; // 更新last_timestamp
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
}

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);

export {
    AcGameObject
}