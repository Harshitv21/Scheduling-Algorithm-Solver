# First Come, First Serve (FCFS)

## Input

### Arrival Time

```text
0 2 4 6 8
```

### Burst Time

```text
3 6 4 5 2
```

## Output

| Job | Arrival Time | Burst Time | Finish Time | Turnaround Time | Waiting Time |
| --- | ------------ | ---------- | ----------- | --------------- | ------------ |
| J1  | 0            | 3          | 3           | 3               | 0            |
| J2  | 2            | 6          | 9           | 7               | 1            |
| J3  | 4            | 4          | 13          | 9               | 5            |
| J4  | 6            | 5          | 18          | 12              | 7            |
| J5  | 8            | 2          | 20          | 12              | 10           |
