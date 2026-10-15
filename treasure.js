// 模拟宝藏地图API(含新增情节)
class TreasureMap {
    // 小工具:统一延时写法
    static #delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static getInitialClue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("📖 在古老的图书馆里找到了第一个线索: 一张写着古文字的羊皮纸...");
        }, 1000);
      });
    }

    static decodeAncientScript(clue) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 修复原代码的坑:reject 之后不该继续走 resolve
          if (!clue) {
            reject(new Error("没有线索可以解码!"));
            return;
          }
          resolve("🗺️ 解码成功!宝藏在一座古老的神庙中...");
        }, 1500);
      });
    }

    // —— 新情节 1:迷雾之河(有概率迷失,靠重试机制过关) ——
    static crossFoggyRiver() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.35) {
            reject(new Error("🌊 迷雾太浓,你在河上迷失了方向"));
            return;
          }
          resolve("⛵ 渡过了迷雾之河,对岸传来古老的钟声");
        }, 1200);
      });
    }

    // —— 新情节 2:三条密道并行探索(Promise.any:谁先成功用谁) ——
    static scoutPaths() {
      const path = (name, ms) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.35) {
              reject(new Error(`${name} 是死路`));
              return;
            }
            resolve(`🌿 ${name} 通往神庙侧门`);
          }, ms);
        });

      return Promise.any([
        path("苔藓小径", 500),
        path("地下暗河", 900),
        path("断崖栈道", 1400),
      ]);
    }

    // —— 新情节 3:躲避神庙守卫(Promise.race:潜行 vs 被发现) ——
    static sneakPastGuardian() {
      return Promise.race([
        this.#delay(900).then(() => "🤫 你贴着石柱潜行,守卫毫无察觉"),
        this.#delay(500 + Math.random() * 1000).then(() => {
          throw new Error("🗿 守卫转身发现了你!");
        }),
      ]);
    }

    // —— 新情节 4:宝箱上的谜语锁(答错要重来) ——
    static solveRiddle() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.4) {
            reject(new Error("❌ 答错了,谜语锁纹丝不动"));
            return;
          }
          resolve('🔓 咒语响起,锁芯"咔哒"一声弹开');
        }, 1000);
      });
    }

    static searchTemple(location) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.5) {
            reject(new Error("糟糕!遇到了神庙守卫!"));
            return;
          }
          resolve("找到了一个神秘的箱子...");
        }, 2000);
      });
    }

    static openTreasureBox() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("💎 恭喜!你找到了传说中的宝藏 —— 永恒之星!");
        }, 1000);
      });
    }
  }

/* ==================== 版本一:Promise 链式调用 ==================== */
function findTreasureWithPromises() {
  TreasureMap.getInitialClue()
    .then(clue => {
      console.log(clue);
      return TreasureMap.decodeAncientScript(clue);
    })
    .then(location => {
      console.log(location);
      return TreasureMap.searchTemple(location);
    })
    .then(box => {
      console.log(box);
      return TreasureMap.openTreasureBox();
    })
    .then(treasure => {
      console.log(treasure);
    })
    .catch(error => {
      console.error("任务失败:", error.message ?? error);
    });
}

/* ==================== 版本二:async / await 重写 ==================== */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 通用重试器:失败自动重来,降低"运气不好直接game over"的挫败感
async function withRetry(task, { times = 3, delay = 600, label = "步骤" } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      return await task(attempt);
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ ${label} 第 ${attempt} 次失败: ${error.message}`);
      if (attempt < times) {
        console.log(`🔁 重振旗鼓,${delay}ms 后再试...`);
        await sleep(delay);
      }
    }
  }
  throw lastError;
}

async function findTreasureWithAsyncAwait() {
  const start = Date.now();

  try {
    // ① 图书馆的线索(串行等待)
    const clue = await TreasureMap.getInitialClue();
    console.log(clue);

    // ② 解码古卷(串行等待)
    const location = await TreasureMap.decodeAncientScript(clue);
    console.log(location);

    // ③ 新情节:迷雾之河 —— 用 try/catch + 重试代替 .catch()
    console.log(
      await withRetry(() => TreasureMap.crossFoggyRiver(), { label: "渡河", times: 3 })
    );

    // ④ 新情节:三条密道并行探索(Promise.any,最快的一条先返回)
    console.log(
      await withRetry(() => TreasureMap.scoutPaths(), { label: "探路", times: 2, delay: 400 })
    );

    // ⑤ 新情节:与神庙守卫赛跑(Promise.race)
    console.log(
      await withRetry(() => TreasureMap.sneakPastGuardian(), { label: "潜行", times: 3, delay: 400 })
    );

    // ⑥ 新情节:破解宝箱谜语
    const hints = ["答案藏在古老的钟声里", "答案与月光有关", "答案就在你脚下的石板上"];
    console.log(
      await withRetry(
        async (attempt) => {
          try {
            return await TreasureMap.solveRiddle();
          } catch (error) {
            console.log(`💡 提示 ${attempt}: ${hints[attempt - 1] ?? hints[hints.length - 1]}`);
            throw error;
          }
        },
        { label: "解谜", times: 3, delay: 400 }
      )
    );

    // ⑦ 开箱!
    console.log(await TreasureMap.openTreasureBox());

    console.log(`🏁 寻宝完成,全程用时 ${((Date.now() - start) / 1000).toFixed(1)} 秒`);
  } catch (error) {
    // 所有 await 的异常都会汇总到这里,无需每步单独 catch
    console.error("💀 任务失败:", error.message ?? error);
  }
}

findTreasureWithPromises();       // 版本一:链式调用
// findTreasureWithAsyncAwait();  // 版本二:async/await(取消注释即可运行)