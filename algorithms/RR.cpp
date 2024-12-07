#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Process {
    char id;            // Unique identifier for the process
    int arrivalTime;    // Time when the process arrives
    int burstTime;      // CPU time required for the process
    int remainingTime;
    int completionTime; // Time when the process finishes execution
    int turnAroundTime; // Completion time - Arrival time
    int waitingTime;    // Turnaround time - Burst time
};

void roundRobin(vector<Process>& processes, int timeQuantum) {
    int currentTime = 0;
    queue<int> readyQueue;
    int n = processes.size();
    vector<bool> isInQueue(n, false);

    for (auto& process : processes) {
        // Initialize remaining time
        process.remainingTime = process.burstTime; 
    }

    // Start with the first process
    readyQueue.push(0); 
    isInQueue[0] = true;

    while (!readyQueue.empty()) {
        int idx = readyQueue.front();
        readyQueue.pop();

        // Process the current job for a time quantum or its remaining time
        if (processes[idx].remainingTime > timeQuantum) {
            currentTime += timeQuantum;
            processes[idx].remainingTime -= timeQuantum;
        } else {
            currentTime += processes[idx].remainingTime;
            processes[idx].remainingTime = 0;
            processes[idx].completionTime = currentTime;
            processes[idx].turnAroundTime = processes[idx].completionTime - processes[idx].arrivalTime;
            processes[idx].waitingTime = processes[idx].turnAroundTime - processes[idx].burstTime;
        }

        // Add processes that have arrived during this time to the queue
        for (int i = 0; i < n; i++) {
            if (!isInQueue[i] && processes[i].arrivalTime <= currentTime && processes[i].remainingTime > 0) {
                readyQueue.push(i);
                isInQueue[i] = true;
            }
        }

        // Re-add the current process to the end of the queue if not completed
        if (processes[idx].remainingTime > 0) {
            readyQueue.push(idx);
        }
    }

    // Output Results
    cout << "\nRound Robin Scheduling:\n";
    /*
    A.T => Arrival time
    B.T => Burst time
    C.T => Completion time / finish time
    T.A.T => Turn around time
    W.T => Waiting time
    */
    cout << "Process\tA.T\tB.T\tC.T\tT.A.T\tW.T\n";
    for (const auto& process : processes) {
        cout << process.id << "\t" << process.arrivalTime << "\t" << process.burstTime << "\t" 
             << process.completionTime << "\t" << process.turnAroundTime << "\t" << process.waitingTime << "\n";
    }
}

int main() {
    /*
    Arrival time - 0 1 2 3 4
    Burst time - 5 4 3 2 6
    time quantum - 2
    */
    int timeQuantum = 2;
    vector<Process> processes = {
        {'A', 0, 5},
        {'B', 1, 4},
        {'C', 2, 3},
        {'D', 3, 2},
        {'E', 4, 6}
    };

    roundRobin(processes, timeQuantum);

    return 0;
}
