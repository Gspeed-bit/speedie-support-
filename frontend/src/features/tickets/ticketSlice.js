import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

// Initial state for the ticket slice
const initialState = {
  tickets: [], // List of multiple tickets
  ticket: {}, // Single ticket object
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

// Async thunk for creating a new ticket
export const createTicket = createAsyncThunk(
  'tickets/create', // Action type for creating a ticket
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // Attempt to create the ticket using the ticketService
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      // Construct a meaningful error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the thunk with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for getting a user ticket
export const getTickets = createAsyncThunk(
  'tickets/getAll', // Action type for getting a ticket
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // Attempt to get the ticket using the ticketService
      return await ticketService.getTickets(token);
    } catch (error) {
      // Construct a meaningful error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the thunk with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for getting a user ticket by id
export const getTicket = createAsyncThunk(
  'tickets/get', // Action type for getting a ticket
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // Attempt to get the ticket using the ticketService
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      // Construct a meaningful error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the thunk with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Async thunk for getting a user ticket by id
export const updateTicketStatus = createAsyncThunk(
  'tickets/update', // Action type for updating a ticket
  async ({ ticketId, newStatus }, thunkAPI) => {
    try {
      // Attempt to update the ticket status using the ticketService
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.updateTicketStatus(ticketId, token, newStatus);
    } catch (error) {
      // Construct a meaningful error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the thunk with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Async thunk for getting a user ticket by id
export const closeTicket = createAsyncThunk(
  'tickets/close', // Action type for updating a ticket
  async ({ ticketId, token, newStatus }, thunkAPI) => {
    try {
      // Attempt to update the ticket status using the ticketService
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      // Construct a meaningful error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the thunk with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice for the ticket
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    // Reducer to reset the state
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Inside extraReducers of ticketSlice
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update ticket status in the state
        const updatedTicket = action.payload;
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === updatedTicket._id ? updatedTicket : ticket
        );
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'Closed')
            : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
