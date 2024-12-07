#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Process {
    char id;             // Unique identifier for the process
    int arrivalTime;     // Time when the process arrives
    int burstTime;       // CPU time required for the process
    int completionTime;  // Time when the process finishes execution
    int turnAroundTime;  // Completion time - Arrival time
    int waitingTime;     // Turnaround time - Burst time
};

void sjf(std::vector<Process>& processes) {
    int currentTime = 0;
    int completed = 0;
    int n = processes.size();
    std::vector<bool> isCompleted(n, false);

    while (completed < n) {
        int idx = -1;
        int minBurstTime = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (!isCompleted[i] && processes[i].arrivalTime <= currentTime) {
                if (processes[i].burstTime < minBurstTime) {
                    minBurstTime = processes[i].burstTime;
                    idx = i;
                }
            }
        }

        if (idx != -1) {
            currentTime += processes[idx].burstTime;
            processes[idx].completionTime = currentTime;
            processes[idx].turnAroundTime = processes[idx].completionTime - processes[idx].arrivalTime;
            processes[idx].waitingTime = processes[idx].turnAroundTime - processes[idx].burstTime;
            isCompleted[idx] = true;
            completed++;
        } else {
            currentTime++;
        }
    }

    // Output Results
    std::cout << "\nSJF Scheduling:\n";
    /*
    A.T => Arrival time
    B.T => Burst time
    C.T => Completion time / finish time
    T.A.T => Turn around time
    W.T => Waiting time
    */
    std::cout << "Process\tA.T\tB.T\tC.T\tT.A.T\tW.T\n";
    for (const auto& process : processes) {
        std::cout << process.id << "\t"
                  << process.arrivalTime << "\t"
                  << process.burstTime << "\t"
                  << process.completionTime << "\t"
                  << process.turnAroundTime << "\t"
                  << process.waitingTime << "\n";
    }
}

int main() {
    /*
    Arrival time - 0 2 4 6 8
    Burst time - 7 2 3 6 5
    */
    std::vector<Process> processes = {
        {'A', 0, 7},
        {'B', 2, 2},
        {'C', 4, 3},
        {'D', 6, 6},
        {'E', 8, 5}
    };
    
    std::vector<Process> sjfProcesses = processes;
    sjf(sjfProcesses);

    return 0;
}