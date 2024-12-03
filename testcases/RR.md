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
| A   | 0            | 5          | 16          | 16              | 11           |
| B   | 1            | 4          | 14          | 13              | 9            |
| C   | 2            | 3          | 15          | 13              | 10           |
| D   | 3            | 2          | 10          | 7               | 5            |
| E   | 4            | 6          | 20          | 16              | 10           |
