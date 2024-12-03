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
| J1  | 0            | 7          | 7           | 7               | 0            |
| J2  | 2            | 2          | 9           | 7               | 5            |
| J3  | 4            | 3          | 12          | 8               | 5            |
| J5  | 8            | 5          | 17          | 9               | 4            |
| J4  | 6            | 6          | 23          | 17              | 11           |
