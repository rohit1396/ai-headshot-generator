
import {
    useReducer,
    useRef,
    useEffect,
    useCallback,
  } from "react";
  
  import { generateHeadshot } from "../services/mockGenerationService";
  
  const initialState = {
    status: "idle",
    progress: 0,
    stage: null,
    message: "",
    error: null,
    result: null,
  };
  
  function generationReducer(state, action) {
    switch (action.type) {
      case "START":
        return {
          ...initialState,
          status: "processing",
          message: "Preparing your image",
        };
  
      case "PROGRESS":
        return {
          ...state,
          ...action.payload,
        };
  
      case "SUCCESS":
        return {
          ...state,
          status: "success",
          progress: 100,
          message: "Your headshot is ready",
          result: action.payload,
        };
  
      case "ERROR":
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
  
      case "CANCEL":
        return {
          ...state,
          status: "cancelled",
          message: "Generation cancelled",
        };
  
      case "RESET":
        return { ...initialState };
  
      default:
        return state;
    }
  }
  
  export default function useHeadshotGenerator() {
    const [state, dispatch] = useReducer(
      generationReducer,
      initialState
    );
  
    const controllerRef = useRef(null);
    const lastRequestRef = useRef(null);
  
    const startGeneration = useCallback(
      async (request, options = {}) => {
        // Cancel any previous generation
        controllerRef.current?.abort();
  
        const controller = new AbortController();
  
        controllerRef.current = controller;
        lastRequestRef.current = request;
  
        dispatch({ type: "START" });
  
        try {
          const result = await generateHeadshot(request, {
            signal: controller.signal,
            simulateError: options.simulateError ?? false,
  
            onProgress: (progressData) => {
              if (controllerRef.current !== controller) return;
  
              dispatch({
                type: "PROGRESS",
                payload: progressData,
              });
            },
          });
  
          if (controllerRef.current !== controller) return;
  
          dispatch({
            type: "SUCCESS",
            payload: result,
          });
  
          return result;
        } catch (error) {
          if (controllerRef.current !== controller) return;
  
          if (error.name === "AbortError") {
            dispatch({ type: "CANCEL" });
            return;
          }
  
          dispatch({
            type: "ERROR",
            payload:
              error.message || "Something went wrong.",
          });
        } finally {
          if (controllerRef.current === controller) {
            controllerRef.current = null;
          }
        }
      },
      []
    );
  
    const cancelGeneration = useCallback(() => {
      const controller = controllerRef.current;
  
      if (!controller) return;
  
      controllerRef.current = null;
      controller.abort();
  
      dispatch({ type: "CANCEL" });
    }, []);
  
    const retryGeneration = useCallback(() => {
      if (!lastRequestRef.current) return;
  
      return startGeneration(lastRequestRef.current);
    }, [startGeneration]);
  
    const resetGeneration = useCallback(() => {
      const controller = controllerRef.current;
  
      controllerRef.current = null;
      controller?.abort();
  
      lastRequestRef.current = null;
  
      dispatch({ type: "RESET" });
    }, []);
  
    useEffect(() => {
      return () => {
        const controller = controllerRef.current;
  
        controllerRef.current = null;
        controller?.abort();
      };
    }, []);
  
    return {
      ...state,
      startGeneration,
      cancelGeneration,
      retryGeneration,
      resetGeneration,
    };
  }
  