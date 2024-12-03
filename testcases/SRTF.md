# Shortest Remaining Time First (SRTF)

## Input

### Arrival Time

```text
0 1 3 5 6
```

### Burst Time

```text
8 4 9 5 2
```

## Output

| Job | Arrival Time | Burst Time | Finish Time | Turnaround Time | Waiting Time |
| --- | ------------ | ---------- | ----------- | --------------- | ------------ |
| J1  | 0            | 8          | 23          | 23              | 15           |
| J2  | 1            | 4          | 5           | 4               | 0            |
| J3  | 3            | 9          | 26          | 23              | 14           |
| J4  | 5            | 5          | 12          | 7               | 2            |
| J5  | 6            | 2          | 8           | 2               | 0            |
