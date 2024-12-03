# Shortest Job First (SJF)

## Input

### Arrival Time

```text
0 2 4 6 8
```

### Burst Time

```text
7 2 3 6 5
```

## Output

| Job | Arrival Time | Burst Time | Finish Time | Turnaround Time | Waiting Time |
| --- | ------------ | ---------- | ----------- | --------------- | ------------ |
| A   | 0            | 7          | 7           | 7               | 0            |
| B   | 2            | 2          | 9           | 7               | 5            |
| C   | 4            | 3          | 12          | 8               | 5            |
| D   | 6            | 6          | 23          | 17              | 11           |
| E   | 8            | 5          | 17          | 9               | 4            |
