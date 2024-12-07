#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Process {
    char id;            // Unique identifier for the process
    int arrivalTime;    // Time when the process arrives
    int burstTime;      // CPU time required for the process
    int completionTime; // Time when the process finishes execution
    int turnAroundTime; // Completion time - Arrival time
    int waitingTime;    // Turnaround time - Burst time
};

void fcfs(std::vector<Process> &processes) {
    std::sort(processes.begin(), processes.end(), [](const Process &a, const Process &b) { 
        return a.arrivalTime < b.arrivalTime; 
    });

    int currentTime = 0;
    for (auto &process : processes) {
        if (currentTime < process.arrivalTime) {
            currentTime = process.arrivalTime;
        }
        process.completionTime = currentTime + process.burstTime;
        process.turnAroundTime = process.completionTime - process.arrivalTime;
        process.waitingTime = process.turnAroundTime - process.burstTime;
        currentTime += process.burstTime;
    }

    // Output Results
    std::cout << "\nFCFS Scheduling:\n";
    /*
    A.T => Arrival time
    B.T => Burst time
    C.T => Completion time / finish time
    T.A.T => Turn around time
    W.T => Waiting time
    */
    std::cout << "Process\tA.T\tB.T\tC.T\tT.A.T\tW.T\n";
    for (const auto &process : processes) {
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
    Burst time - 3 6 4 5 2
    */
    std::vector<Process> processes = {
        {'A', 0, 3},
        {'B', 2, 6},
        {'C', 4, 4},
        {'D', 6, 5},
        {'E', 8, 2}};

    // Copy processes for separate algorithms
    std::vector<Process> fcfsProcesses = processes;
    fcfs(fcfsProcesses);

    return 0;
}