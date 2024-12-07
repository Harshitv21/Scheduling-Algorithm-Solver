#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct Process {
    char id;            // Unique identifier for the process
    int arrivalTime;    // Time when the process arrives
    int burstTime;      // CPU time required for the process
    int remainingTime;  // Time left for completion
    int completionTime; // Time when the process finishes execution
    int turnAroundTime; // Completion time - Arrival time
    int waitingTime;    // Turnaround time - Burst time
};

void srtf(vector<Process>& processes) {
    int currentTime = 0;
    int completed = 0;
    int n = processes.size();
    int shortest = -1; // Index of the process with the shortest remaining time
    int minRemainingTime = INT_MAX;
    vector<bool> isCompleted(n, false);

    for (auto& process : processes) {
        process.remainingTime = process.burstTime; // Initialize remaining time
    }

    while (completed < n) {
        shortest = -1;
        minRemainingTime = INT_MAX;

        // Find the process with the shortest remaining time that has arrived
        for (int i = 0; i < n; i++) {
            if (!isCompleted[i] && processes[i].arrivalTime <= currentTime && processes[i].remainingTime < minRemainingTime) {
                minRemainingTime = processes[i].remainingTime;
                shortest = i;
            }
        }

        if (shortest == -1) {
            currentTime++; // If no process is ready, move the time forward
            continue;
        }

        // Process the selected job for 1 unit of time
        processes[shortest].remainingTime--;
        currentTime++;

        // If the process is completed
        if (processes[shortest].remainingTime == 0) {
            processes[shortest].completionTime = currentTime;
            processes[shortest].turnAroundTime = processes[shortest].completionTime - processes[shortest].arrivalTime;
            processes[shortest].waitingTime = processes[shortest].turnAroundTime - processes[shortest].burstTime;
            isCompleted[shortest] = true;
            completed++;
        }
    }

    // Output Results
    cout << "\nSRTF Scheduling:\n";
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
    Arrival time - 0 1 3 5 6
    Burst time - 8 4 9 5 2
    */
    vector<Process> processes = {
        {'A', 0, 8},
        {'B', 1, 4},
        {'C', 3, 9},
        {'D', 5, 5},
        {'E', 6, 2}
    };

    srtf(processes);
    return 0;
}
