import { Calendar } from 'expo';

import * as TestUtils from '../TestUtils';

async function createTestCalendarAsync() {
  return await Calendar.createCalendarAsync({
    title: 'Expo test-suite calendar',
    color: '#4B968A',
    entityType: Calendar.EntityTypes.EVENT,
    name: 'expo-test-suite-calendar',
    // sourceId: ,
    source: {
      isLocalAccount: true,
      name: 'expo',
    },
  });
}

export async function test(t) {
  const shouldSkipTestsRequiringPermissions = await TestUtils.shouldSkipTestsRequiringPermissionsAsync();
  const describeWithPermissions = shouldSkipTestsRequiringPermissions ? t.xdescribe : t.describe;

  t.describe('Calendar', () => {
    describeWithPermissions('getCalendarsAsync()', () => {
      t.it('returns an array of calendars', async () => {
        const calendars = await Calendar.getCalendarsAsync();
        t.expect(Array.isArray(calendars)).toBeTruthy();
      });
    });

    describeWithPermissions('createCalendarAsync()', () => {
      let calendarId;

      t.it('creates a calendar', async () => {
        calendarId = await createTestCalendarAsync();

        t.expect(calendarId).toBeDefined();
        t.expect(typeof calendarId).toBe('string');
      });

      afterAll(async () => {
        await Calendar.deleteCalendarAsync(calendarId);
      });
    });

    describeWithPermissions('deleteCalendarAsync()', () => {
      let calendarId;

      beforeAll(async () => {
        calendarId = await createTestCalendarAsync();
      });

      t.it('deletes a calendar', async () => {
        await Calendar.deleteCalendarAsync(calendarId);
      });
    });

    describeWithPermissions('updateCalendarAsync()', () => {
      let calendarId;

      beforeAll(async () => {
        calendarId = await createTestCalendarAsync();
      });

      t.it('updates a calendar', async () => {
        const newTitle = 'New test-suite calendar title';
        const updatedCalendarId = await Calendar.updateCalendarAsync(calendarId, {
          title: newTitle,
        });

        t.expect(updatedCalendarId).toBe(calendarId);
      });

      afterAll(async () => {
        await Calendar.deleteCalendarAsync(calendarId);
      });
    });

    describeWithPermissions('getEventsAsync()', () => {

    });

    describeWithPermissions('getEventAsync()', () => {

    });

    describeWithPermissions('createEventAsync()', () => {

    });

    describeWithPermissions('updateEventAsync()', () => {

    });

    describeWithPermissions('deleteEventAsync()', () => {

    });

    describeWithPermissions('getAttendeesForEventAsync()', () => {

    });

    describeWithPermissions('createAttendeeAsync()', () => {

    });

    describeWithPermissions('updateAttendeeAsync()', () => {

    });

    describeWithPermissions('deleteAttendeeAsync()', () => {

    });

    describeWithPermissions('getRemindersAsync()', () => {

    });

    describeWithPermissions('getReminderAsync()', () => {

    });

    describeWithPermissions('createReminderAsync()', () => {

    });

    describeWithPermissions('updateReminderAsync()', () => {

    });

    describeWithPermissions('deleteReminderAsync()', () => {

    });
  });
}
