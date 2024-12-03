# Round Robin (RR)

## Input

### Arrival Time

```text
0 1 2 3 4
```

### Burst Time

```text
5 4 3 2 6
```

### Time Quantum

```text
2
```

## Output

| Job | Arrival Time | Burst Time | Finish Time | Turnaround Time | Waiting Time |
| --- | ------------ | ---------- | ----------- | --------------- | ------------ |
| J1  | 0            | 5          | 14          | 14              | 9            |
| J2  | 1            | 4          | 12          | 11              | 7            |
| J3  | 2            | 3          | 10          | 8               | 5            |
| J4  | 3            | 2          | 9           | 6               | 4            |
| J5  | 4            | 6          | 16          | 12              | 6            |
