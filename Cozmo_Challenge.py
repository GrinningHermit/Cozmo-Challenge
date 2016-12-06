#!/usr/bin/env python3

from flask import Flask, render_template, request
import flask_helpers
import sys
import random
import cozmo
from cozmo.util import degrees, distance_mm, speed_mmps
import json
import threading

flask_app = Flask(__name__)

# cozmoEnabled can be set to False for testing when Cozmo is not available
cozmoEnabled = True
playing = False
client_ip = ''
counter = 0

randomID = random.randrange(1000000000, 9999999999)


class RobotDoing (threading.Thread):
    def __init__(self, thread_id, name, sequence):
        threading.Thread.__init__(self)
        self.threadID = thread_id
        self.name = name
        self.sequence = sequence

    def run(self):
        do_actions(self.name, self.sequence)


def do_actions(thread_name, sequence):
    # Executing list of received commands
    global playing
    global client_ip
    global counter

    playing = True
    total = len(sequence)
    counter = 0

    print(client_ip + ' started action')

    while counter <= total:
        if counter == total:
            print(thread_name + ' end of program reached')
            playing = False
            counter = -1
            robot.play_anim('anim_keepaway_wingame_03')
            break
        if not playing:
            counter = -1
            print(thread_name + ' aborted')
            robot.play_anim('anim_reacttoblock_failtodock_01')
            break

        print('%s: %s' % (thread_name, sequence[counter]))

        if sequence[counter] == 'forward':
            robot.drive_straight(distance_mm(150), speed_mmps(75)).wait_for_completed()
        if sequence[counter] == 'back':
            robot.drive_straight(distance_mm(-150), speed_mmps(50)).wait_for_completed()
        if sequence[counter] == 'right':
            robot.turn_in_place(degrees(-90)).wait_for_completed()
        if sequence[counter] == 'left':
            robot.turn_in_place(degrees(90)).wait_for_completed()
        if sequence[counter] == 'uturn':
            robot.turn_in_place(degrees(180)).wait_for_completed()
        counter += 1


@flask_app.route('/')
def index():
    return render_template('index.html', randomID = randomID)


@flask_app.route('/program_list', methods=['POST'])
def program_list():
    # Handling of received move command list
    p_list = json.loads(request.data.decode('utf-8'))

    program_sequence = p_list.split()

    global thread1
    global client_ip

    client_ip = request.remote_addr

    if cozmoEnabled:
        thread1 = RobotDoing(1, 'RobotDoingThread', program_sequence)
        thread1.start()

    return ''


@flask_app.route('/stop_robot', methods=['POST'])
def stop_robot():
    # Aborts currently executed command list
    global playing
    if cozmoEnabled:
        playing = False
    print(request.remote_addr + ': stop')
    return ''


@flask_app.route('/return_move', methods=['POST'])
def return_move():
    # Returning move command currently being executed
    global counter
    return str(counter)


def run(sdk_conn):
    # The run method runs once Cozmo is connected
    global robot

    robot = sdk_conn.wait_for_robot()
    flask_helpers.run_flask(flask_app)


if cozmoEnabled:
    if __name__ == '__main__':
        cozmo.setup_basic_logging()
        cozmo.robot.Robot.drive_off_charger_on_connect = False
        try:
            cozmo.connect(run)
        except cozmo.ConnectionError as e:
            sys.exit("A connection error occurred: %s" % e)

else:
    print('Robot testing disabled')
    flask_helpers.run_flask(flask_app)
