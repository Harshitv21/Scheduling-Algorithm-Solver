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
|-----|--------------|------------|-------------|-----------------|--------------|
| A   | 0            | 8          | 19          | 19              | 11           |
| B   | 1            | 4          | 5           | 4               | 0            |
| C   | 3            | 9          | 28          | 25              | 16           |
| D   | 5            | 5          | 12          | 7               | 2            |
| E   | 6            | 2          | 8           | 2               | 0            |
