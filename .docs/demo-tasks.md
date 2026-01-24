# Demo Task Plan: MyPetVenues Feature Enhancements

> 🎯 **Purpose**: A simple 4-task demo to learn multi-agent orchestration
> ⏱️ **Estimated Time**: 10-15 minutes total
> 🎓 **Difficulty**: Beginner (L200)

---

## 📋 Task Overview

This demo adds 4 small features to the MyPetVenues app. Watch how the orchestrator runs 2 agents in parallel!

```
┌────────────────────────────────────────────────────────────────┐
│                        TASK DEPENDENCY GRAPH                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   ┌──────────────┐         ┌──────────────┐                   │
│   │   Task 1     │         │   Task 2     │      WAVE 0       │
│   │ Rating Stars │         │ Open Status  │      (parallel)   │
│   └──────┬───────┘         └──────┬───────┘                   │
│          │                        │                            │
│          └────────────────────────┘                            │
│                       │                                        │
│                       ▼                                        │
│              ┌──────────────┐                                  │
│              │   Task 3     │                  WAVE 1          │
│              │ Enhanced     │                  (after 1 & 2)   │
│              │ VenueCard    │                                  │
│              └──────────────┘                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🌊 Wave 0: Independent Tasks (Run in Parallel)

### Task 1: Add Interactive Rating Stars ⭐

**Description**: Enhance the StarRating component to allow users to hover and click to rate

**Dependencies**: None

**Deliverables**:
- Modify `Components/StarRating.razor` - Add hover state
- Modify `Components/StarRating.razor.css` - Add hover animation

**Acceptance Criteria**:
- [ ] Stars highlight on hover
- [ ] Clicking a star triggers an event
- [ ] Visual feedback on selection

**Estimated Time**: 3-5 minutes

---

### Task 2: Add Open/Closed Status Badge 🟢

**Description**: Create a new component that shows if a venue is currently open or closed

**Dependencies**: None

**Deliverables**:
- Create `Components/OpenStatus.razor` - New component
- Create `Components/OpenStatus.razor.css` - Styles

**Acceptance Criteria**:
- [ ] Shows "Open Now" with green badge if within hours
- [ ] Shows "Closed" with red badge if outside hours
- [ ] Shows "Opens at X" if closed but known

**Estimated Time**: 3-5 minutes

---

## 🌊 Wave 1: Dependent Tasks (Run After Wave 0)

### Task 3: Integrate New Components into VenueCard 🃏

**Description**: Update VenueCard to use the enhanced StarRating and new OpenStatus

**Dependencies**: 
- ✅ Task 1 (Interactive Rating Stars)
- ✅ Task 2 (Open/Closed Status Badge)

**Deliverables**:
- Modify `Components/VenueCard.razor` - Add OpenStatus component
- Modify `Components/VenueCard.razor.css` - Layout adjustments

**Acceptance Criteria**:
- [ ] OpenStatus badge visible in card header
- [ ] Interactive stars work in venue card
- [ ] Layout looks good on mobile and desktop

**Estimated Time**: 4-6 minutes

---

## 📊 Expected Execution

| Wave | Tasks | Parallel? | Time Saved |
|------|-------|-----------|------------|
| Wave 0 | Task 1, Task 2 | Yes (2 agents) | ~3-5 min |
| Wave 1 | Task 3 | No (1 agent) | - |

**Sequential Time**: ~12 minutes (if done one at a time)
**Parallel Time**: ~8 minutes (with Wave 0 parallelization)
**Time Saved**: ~33%!

---

## 🚀 How to Run This Demo

### Step 1: Start the Orchestrator
Use the `swarm-mode.prompt.md` prompt file in VS Code Copilot Chat.

### Step 2: Reference This Plan
Tell the orchestrator: "Run the tasks in `.docs/demo-tasks.md`"

### Step 3: Watch the Magic
1. Orchestrator analyzes dependencies
2. Creates 2 worktrees for Wave 0
3. Spawns 2 parallel agents
4. Both work simultaneously!
5. When done, merges and creates Wave 1
6. Task 3 runs with context from Tasks 1 & 2
7. Final report generated

### Step 4: Check Results
- Look at `.docs/memory.md` for progress log
- Look at `.docs/report.md` for final summary

---

## 💡 Tips for Beginners

1. **Watch the Terminal**: You'll see agents spawn with `Start-Job`
2. **Check Memory Often**: `.docs/memory.md` shows real-time progress
3. **Look at the Report**: `.docs/report.md` summarizes everything
4. **Start Small**: This 3-task demo is perfect for learning

---

## 🔧 Customization Ideas

Once you understand this demo, try:
- Adding more Wave 0 tasks (they all run in parallel!)
- Creating deeper dependency chains (Wave 0 → Wave 1 → Wave 2)
- Making tasks more complex

---

**Ready?** Let the orchestrator know about this file and watch the swarm in action! 🐝
