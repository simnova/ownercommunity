import dayjs from "dayjs";
import { sortDateArray, calculateStartDate, convertToStartOfDayEST } from "./save-daily-gl-summaries";

describe('SaveDailyGlSummaries', () => {
  describe('sortDateArray', () => {
    it('should return the latest date from a list of dates when sortOrder is -1', () => {
      // Arrange
      const testDates = [
        new Date('2024-01-01'),
        new Date('2024-01-02'),
        new Date('2024-01-12'),
        new Date('2024-01-03'),
        new Date('2024-01-05'),
      ];

      // Act
      const result = sortDateArray(testDates, -1)[0];

      // Assert
      expect(result).toEqual(new Date('2024-01-12'));
    });

    it('should return the earliest date from a list of dates when sortOrder is 1', () => {
      // Arrange
      const testDates = [
        new Date('2024-01-01'),
        new Date('2024-01-02'),
        new Date('2024-01-12'),
        new Date('2024-01-03'),
        new Date('2024-01-05'),
      ];

      // Act
      const result = sortDateArray(testDates, 1)[0];

      // Assert
      expect(result).toEqual(new Date('2024-01-01'));
    });

    it('should return an empty array when the input array is empty', () => {
      // Arrange
      const testDates: Date[] = [];

      // Act
      const result = sortDateArray(testDates, 1);

      // Assert
      expect(result).toEqual([]);
    });
  });
  //   // scenario: no blob files exist in the blob storage, the determineLastProcessedDate function 
  //   // returned the current date and we are comparing with a timestamp very close to that date
  //   it('should return 1 when the start and end dates are one second apart', () => {
  //     // Arrange
  //     const startDate = new Date('2024-01-01Z23:59:58');
  //     const endDate = new Date('2024-01-01Z23:59:59');

  //     // Act
  //     const result = getNumberOfDays(startDate, endDate);

  //     // Assert
  //     expect(result).toEqual(1);
  //   });

  //   it('should return 1 when the start and end dates are 1 day apart', () => {
  //     // Arrange
  //     const startDate = new Date('2024-01-01Z00:00:00');
  //     const endDate = new Date('2024-01-02Z00:00:00');

  //     // Act
  //     const result = getNumberOfDays(startDate, endDate);

  //     // Assert
  //     expect(result).toEqual(1);
  //   });

  //   it('should return 2 when the start and end dates are more than 1 day apart', () => {
  //     // Arrange
  //     const startDate = new Date('2024-01-01Z00:00:00');
  //     const endDate = new Date('2024-01-02Z0:00:01');

  //     // Act
  //     const result = getNumberOfDays(startDate, endDate);

  //     // Assert
  //     expect(result).toEqual(2);
  //   });

  //   it('should return 3 when the start and end dates are more than 2 days apart', () => {
  //     // Arrange
  //     const startDate = new Date('2024-09-11Z00:00:00');
  //     const endDate = new Date('2024-09-13Z0:00:01');

  //     // Act
  //     const result = getNumberOfDays(startDate, endDate);

  //     // Assert
  //     expect(result).toEqual(3);
  //   });
  // });

  describe('calculateStartDate', () => {
    it('should return the current date minus one day when no blob dates are provided', () => {
      // Arrange
      const blobDates: string[] = [];

      // Act
      const result = calculateStartDate(blobDates);

      // Assert
      expect(result).toEqual(new Date(Date.now() - 86400000));
    });

    it('should return the last processed date plus one day when blob dates are provided', () => {
      // Arrange
      const blobDates = [
        '2024-01-01',
        '2024-01-02',
        '2024-01-03',
      ];

      // Act
      const result = calculateStartDate(blobDates);

      // Assert
      expect(result).toEqual(new Date('2024-01-04'));
    });
  });

  describe('convertToStartOfDayEST', () => {
    it('should return null when the input date is null', () => {
      // Arrange
      const date = null;

      // Act
      const result = convertToStartOfDayEST(date);

      // Assert
      expect(result).toBeNull();
    });

    it('should return the input date at the start of the day in EST time', () => {
      // Arrange
      const date = new Date('2024-01-01T12:34:56Z');

      // Act
      const result = convertToStartOfDayEST(date);

      // Assert
      expect(result).toEqual(new Date('2024-01-01T05:00:00Z'));
    });

    it('should return the input date at the start of the day in EST time', () => {
      // Arrange
      const date = new Date('2024-09-18T17:30:13.247Z');

      // Act
      const result = convertToStartOfDayEST(date);

      // Assert
      expect(result).toEqual(new Date('2024-09-18T04:00:00Z'));
    });
  });

});