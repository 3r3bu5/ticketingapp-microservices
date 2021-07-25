import {
  publisher,
  Subjects,
  expirationCompleteEvent
} from '@a4hticket/common';

export class expirationCompletePub extends publisher<expirationCompleteEvent> {
  subject: Subjects.expirationComplete = Subjects.expirationComplete;
}
